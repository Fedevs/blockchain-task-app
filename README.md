# blockchain-task-app

Need Truffle and Ganache to try it.

"truffle deployed" to deploy the smart contract
"truffle test" to test it
"truffle console" if you are not using the frontend
>tasksContract = await TasksContract.deployed() => deploys the smart contract
>task = await tasksContract.createTask("Your title", "Your description") => create a task
>task.logs[0].args.id.toNumber() => check your task ID
>task.logs[0].args.done => check status
>updatedTask = tasksContract.toggleDone(yourID) => change status
