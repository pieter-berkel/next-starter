A Hybrid Approach (Recommended in Many Real-World Cases)
You don’t have to pick just one. Many apps benefit from a hybrid:

- Use colocation for small/medium-sized routes or route-specific logic.
- Use a /features or /modules folder for shared, reusable domain logic and components.

/actions
Contains all react's server actions.

/assets
Contains all static assets.

/data-access
Data access layer contains all the database logic.

/utils

The utils directory should contain pure utility functions that:

Have no side effects

Don't depend on external services

/lib

The lib directory is for more complex functionality that often:

Interfaces with external services

Contains business logic

Manages state or side effects

/validations
Contains all zod validation schemas.
