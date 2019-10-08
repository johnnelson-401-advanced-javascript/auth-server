# User Management and Auth

Implement the standard `auth` router. Feel free to add in-class work to your template!
- [X] `POST /api/auth/signup`
- [X] `POST /api/auth/signin`
- [X] `GET /api/auth/verify`

Provide a "me" router:
- [X] `GET /api/me/favorites`
    - [X] Populate favorites on user model
    - [X] Return favorites property as response
- [X] `PUT /api/me/favorites/<id-to-favorite>`
    - [X] "Add to Set" id to user favorites
    - [X] Return new favorites array from user model
- [ ] `DELETE /api/me/favorites/<id-to-delete>`
    - [X] "Pull" id from user favorites
    - [X] Return new favorites array from user model

Provide a router for your entity (`dogs` in this example)
- [X] `POST /api/dogs`
    - [x] Add the authenticated user's id as the `owner` property
- [X] `PUT and DELETE` `/api/dogs/:id`
    - [x] In addition to the `:id`, limit to `owner` who is authenticated user
- [X] `GET /api/dogs`
    - [X] List of all dogs, any authenticated user can access.