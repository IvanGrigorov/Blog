# Blog Client
> This is an Angular client based application that is working alongside the Blog API from the other project. [Blog C# API](https://github.com/IvanGrigorov/PersonalBlog "Blog C# API")<br>
It is a portfolio that displays my current programming projects, my hobbies,
allows me to share my thoughts through categorized articles and shows who I am.

### Core Features:
There is login option based on JWT token. [JWT Tokens](https://jwt.io/ "JWT Tokens")
- It has one way user state manegement, based on Observables, wich is responsible for storing the user info, based on the token.
- It has HTTP client interceptor that adds the token (if exists) for every request for authentication
- It has special route guard that limits the access to pages if the user is not authenticated

It allows to make requests for CRUD for Projects and Articles.
- You can also upload images for Projects and Articles.
- Built in two-way form bindings and validators are used. 

It has a Loading service and iterceptor.
- This checks if there are still unfinished requests and displays a loading screen if so.

It has Errorhandling service and interceptor.
- It has an interceptor that retries the request on failure.
- Based on the error (401, 404, 500) the additional error handler either redirects the user to login, to the error page or just display the error message.

Additional integrations:
- For the HTML pages Bootstrap is used [Bootstrap](https://getbootstrap.com/ "Bootstrap")
- Toastr messages in app [Toastr](https://blog.jscrambler.com/how-to-create-angular-toastr-notifications/ "Toastr")
- Notification service for local notifications [Notifications](https://developer.mozilla.org/en-US/docs/Web/API/notification "Notifications")
- Facebook comments and like plugin [FB Comments](https://developers.facebook.com/docs/plugins/comments/ "FB Comments")

Future development:
- Resseting password through email
- Adding logos for badges

