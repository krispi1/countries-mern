/*

////////////////////////////////////////////////////////////
Problem: api1

On attempt to create new user
http://localhost:4001/auth/signup

error:

{
    "error": {
        "errors": {
            "userName": {
                "message": "Path `userName` is required.",
                "name": "ValidatorError",
                "properties": {
                    "message": "Path `userName` is required.",
                    "type": "required",
                    "path": "userName"
                },
                "kind": "required",
                "path": "userName"
            }
        },
        "_message": "User validation failed",
        "message": "User validation failed: userName: Path `userName` is required.",
        "name": "ValidationError"
    }
}

Solution:

I realized it was a simple case of mismatching cases.
I had used "userName" in my mongoose model, but I supplied
"username" in my queries.

Lesson learned: mongoose.Schema is case-sensitive

////////////////////////////////////////////////////////////
Problem: api2

On attempt to create new user (successively)
http://localhost:4001/auth/signup

at processTicksAndRejections (internal/process/task_queues.js:75:11) {
  driver: true,
  name: 'MongoError',
  index: 0,
  code: 11000,
  keyPattern: { userName: 1 },
  keyValue: { userName: null },
  errmsg: 'E11000 duplicate key error 
  collection: countriesMERN.users index:userName_1 
  dup key: { userName: null }',
  [Symbol(mongoErrorContextSymbol)]: {}
}

Solution:

Stemming from the api1 error above api2 comes about since
internally, mongodb had created an index for userName.

I actually dropped the entire database in order for mongodb 
to start afresh with new keys and indexes.

https://stackoverflow.com/questions/24430220/e11000-duplicate-key-error-index-in-mongodb-mongoose

////////////////////////////////////////////////////////////


*/
