App = {
    contracts: {},
    init: async () => {
        await App.loadEthereum();
        await App.loadAccounts();
        await App.loadContracts();
        App.render();
        await App.renderTask();
    },
    loadEthereum: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            await App.loadAccounts();
        } else if (window.web3) {
            // Before Metamask new version, web3 was used...
            web3 = new Web3(window.web3.currentProvider);
        } else {
            console.log("No Ethereum browser is installed.");
        }
    },
    loadAccounts: async () => {
        const accounts = await App.web3Provider.request({ method: 'eth_requestAccounts' });
        App.account = accounts[0];
    },
    loadContracts: async () => {
        const res = await fetch("TasksContract.json");
        const TasksContractJSON = await res.json();
        App.contracts.tasksContract = TruffleContract(TasksContractJSON);
        App.contracts.tasksContract.setProvider(App.web3Provider);
        App.tasksContract = await App.contracts.tasksContract.deployed();
    },
    render: () => {
        document.getElementById("account").innerText = App.account;
    },
    renderTask: async () => {
        const taskCounter = await App.tasksContract.taskCounter();
        const taskCounterNumber = taskCounter.toNumber();
        
        let html = "";

        for(let i = 1; i <= taskCounterNumber; i++) {
            const loadedTask = await App.tasksContract.tasks(i);
            const task = {
                id: loadedTask[0],
                title: loadedTask[1],
                description: loadedTask[2],
                done: loadedTask[3],
                createdAt: loadedTask[4],
            }

            let taskElement = `
            <div class="card bg-dark rounded-0 mb-2">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span>${task.title}</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" ${task.done && "checked"} onchange="App.toggleDone(${task.id})">
                    </div>
                </div>
                <div class="card-body">
                    <span>${task.description}</span>
                    <p class="text-muted">Task was created on ${new Date(task.createdAt * 1000).toLocaleString()}</p>
                </div>
            </div>
            `
            html += taskElement;
        }

        document.getElementById("taskList").innerHTML = html;

    },
    createTask: async (title, description) => {
        await App.tasksContract.createTask(title, description, {
            from: App.account
        });
        window.location.reload();
    },
    toggleDone: async (id) => {
        await App.tasksContract.toggleDone(id, {
            from: App.account
        })
        window.location.reload();
    },
}

App.init();

