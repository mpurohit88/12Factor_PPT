#HSLIDE

# 12 Factor

<span class="primary"><strong> Anusha Pakalakunja & Mukesh Purohit </strong></span> - 19 April 2018

#HSLIDE

# Why 12 Factor ?

#HSLIDE

## I. Codebase
- One codebase tracked in revision control, many deploys
- Multiple apps sharing the same code is a violation of twelve-factor
- The codebase is the same across all deploys, although different versions may be active in each deploy.

#HSLIDE

## II. Dependencies
- Dependency should be explicitly declared
- User dependency manager. like npm , maven or gradle
- If any system app is supposed to be needed for the app , it should be vendred/shipped with the app. Like flyway, selenium , or any of the chrome drivers.

#HSLIDE

## III. Config
- Store config in the environment
- Project can be made open source any time without keeping the credentials checked in the code.

#HSLIDE

## IV. Backing services
- Treat backing services as attached resources
- A backing service is any service the app consumes over the network as part of its normal operation
- Examples include datastores (such as MySQL or CouchDB), messaging/queueing and caching systems

#HSLIDE

## V. Build, release, run
- Strictly separate build and run stages
- For example, it is impossible to make changes to the code at runtime, since there is no way to propagate those changes back to the build stage.

#HSLIDE

## VI. Processes
- Execute the app as one or more stateless processes
- If a data has to be shared across multiple session, then it should be stored in memcache or redid.
- Sticky session is a violation of 12 factor principle

#HSLIDE

## VII. Port binding
- Export services via port binding

#HSLIDE

## VIII. Concurrency
- Scale out via the process model

#HSLIDE

## IX. Disposability
- Maximize robustness with fast startup and graceful shutdown

#HSLIDE

## X. Dev/prod parity
- Keep development, staging, and production as similar as possible
- The time gap
- The personnel gap
- The tools gap

#HSLIDE

## XI. Logs
- Treat logs as event streams

#HSLIDE

## XII. Admin processes
- Run admin/management tasks as one-off processes
- Running database migrations

#HSLIDE

# Questions ?

#HSLIDE

# Thank you :)
