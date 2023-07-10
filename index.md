# Reinforcer, a base backend for quiz apps.

## The Architecture

Our app is based on simple principles:

- We should can easily read and understand the code.
- We should can easily read and understand the commit history.
- We should can easily add a new feature.
- We should can easily modify an old feature.
- We should can easily change a dependency, without breaking the previous features.

To accomplish these principles, we will use the Test-Driven Development philosophy and the following architecture:

The **domain** layer constitutes the abstract idea of the main entities our application will use, so, there we have the interfaces and base classes of them. (`domain/types` and `domain/entities`).

The **data** layer constitutes base actions of these entities, so there will have contracts that describe these actions. (i.e: `data/<entity>/save`).

The **application** layer constitutes actions that provides real value to the entire system (the business' logic) so there will be the usecases (final compound actions) and common processes (mid compound actions). (`application/usecases` and `application/processes`).

The **infra** layer will implement the **data** layer actions, using types and entities and, of course, external/dependency-based code.

The **main** layer will just wrap everything, maybe making use of the concept of `adapters`: pieces of code that provides communication between our app API and some external API (i.e: an `ExpressAdapter` class could wrap a usecase to an `Express.js` route, making possible the use of a REST API).

The layers will be under `src` directory and the tests will be under `test` directory.
