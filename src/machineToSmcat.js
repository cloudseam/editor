
/**
 * Convert the valid machine to a JSON object that can be consumed
 * by State Machine Cat for output.
 */
function machineToSmcat(machine) {
    if (machine === null || typeof machine.states !== 'object')
        return null;

    const smcatConfig = {
        states : [
            { name: "initial", type: "initial" },
            { name: "final", type: "final" },
        ],
        transitions : [
            { from: "initial", to: "INIT", },
        ],
    };

    const states = Object.keys(machine.states);

    states.forEach(stateName => {
        const state = machine.states[stateName];
        
        const stateConfig = {
            name : stateName,
            type: "regular"
        };

        if (state.tasks) {
            stateConfig.actions = [];
            state.tasks.forEach(taskName => {
                stateConfig.actions.push({
                    type: "activity",
                    body: `- ${taskName}`
                });
            });
        }

        if (state.on) {
            const eventNames = Object.keys(state.on);

            eventNames.forEach(eventName => {
                state.on[eventName]
                    .filter(a => a.action === 'advance')
                    .forEach(action => {
                        smcatConfig.transitions.push({
                            from: stateName,
                            to: action.state,
                            label: eventName,
                        });
                    });
            });
        }

        if (state.terminal) {
            smcatConfig.transitions.push({
                from: stateName,
                to: 'final',
            });
        }

        smcatConfig.states.push(stateConfig);
    });

    return smcatConfig;
}

module.exports = machineToSmcat;