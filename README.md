# User Management and Auth

Implement the standard `auth` router. Feel free to add in-class work to your template!
- [ ] `POST /api/auth/signup`
- [ ] `POST /api/auth/signin`
- [ ] `GET /api/auth/verify`

Provide a "me" router:
- [ ] `GET /api/me/favorites`
    - [ ] Populate favorites on user model
    - [ ] Return favorites property as response
- [ ] `PUT /api/me/favorites/<id-to-favorite>`
    - [ ] "Add to Set" id to user favorites
    - [ ] Return new favorites array from user model
- [ ] `DELETE /api/me/favorites/<id-to-delete>`
    - [ ] "Pull" id from user favorites
    - [ ] Return new favorites array from user model

Provide a router for your entity (`dogs` in this example)
- [X] `POST /api/dogs`
    - [x] Add the authenticated user's id as the `owner` property
- [X] `PUT and DELETE` `/api/dogs/:id`
    - [x] In addition to the `:id`, limit to `owner` who is authenticated user
- [X] `GET /api/dogs`
    - [X] List of all dogs, any authenticated user can access.