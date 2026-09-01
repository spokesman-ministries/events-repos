# Frontend → Backend API Contract

Both apps talk to the same backend (`NEXT_PUBLIC_BASEURL_URL`, e.g.
`https://admin.spokesmancom.org/api`) and both follow the **same response
envelope**, already in use by `ilcon-spokesman`:

```ts
interface ApiResponse<T = any> {
  message: string;
  success: boolean;
  data?: T;
}
```

Every endpoint below is a `POST` with `Content-Type: application/json`, and
the frontend always expects that envelope back — `success: true|false` drives
which screen the form shows next, `message` is shown to the user verbatim
when `success` is `false`.

---

## ILCON — `ilcon-spokesman` (existing, unchanged)

### `POST /ilcon-attendees`
Registers an attendee (with optional children/dependents), each tied to a
paid category.

**Request body**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "categoryId": "string",
  "children": [
    { "name": "string", "email": "string", "phone": "string", "categoryId": "string" }
  ],
  "total_payment": 15000
}
```

**Response**
```json
{ "success": true, "message": "Registration received", "data": { "id": "..." } }
```
On `success: false`, `message` is shown to the user (e.g. duplicate email,
sold-out category).

### `POST /ilcon-attendees/check-email`
Used inline while the form is being filled to warn about a duplicate email
before submit.

**Request body**
```json
{ "email": "string" }
```

**Response**
```json
{ "success": true, "message": "", "data": { "exists": false } }
```

---

## FIT — `fit` (new)

FIT 2026 is **pure registration — no payment, no categories**. Same envelope
and same duplicate-email-check pattern as ILCON, simplified.

### `POST /fit-attendees`
Registers the primary attendee and, optionally, the guest(s) they're
bringing (for reservation headcount only — guests are not separate paid
registrants).

**Request body**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "guests": [
    { "name": "string" }
  ],
  "guest_count": 2
}
```
- `guests` is `[]` and `guest_count` is `0` when the attendee is coming
  alone.
- There is no `categoryId` / `total_payment` — this event has no ticketing
  tiers.

**Response**
```json
{ "success": true, "message": "Registration received", "data": { "id": "..." } }
```
`success: false` → `message` is shown to the user as-is (e.g. "This email is
already registered").

### `POST /fit-attendees/check-email`
Same shape and purpose as ILCON's version — called inline as the user types
their email (and again per guest email, if guest emails are ever added
later) to warn about duplicates before submit.

**Request body**
```json
{ "email": "string" }
```

**Response**
```json
{ "success": true, "message": "", "data": { "exists": false } }
```

---

## Notes for whoever implements the backend routes

- Keep the `{ message, success, data }` envelope exactly — the frontend
  doesn't special-case HTTP status codes, it reads `success` from the body.
- `fit-attendees` intentionally mirrors `ilcon-attendees`'s naming/shape
  minus payment fields, so the same backend patterns (validation, duplicate
  check, admin listing) can likely be reused with a new table
  (`fit_attendees`) rather than a new code path.
- If the FIT event ever needs its own admin export/listing endpoint, follow
  the same `/fit-attendees` prefix (e.g. `GET /fit-attendees` for an admin
  list) to stay consistent.
