import * as aleo from "@aleohq/sdk";

await aleo.initializeWasm();
await aleo.initThreadPool(10);

const defaultHost = "https://vm.aleo.org/api";
const keyProvider = new aleo.AleoKeyProvider();
const programManager = new aleo.ProgramManager(
  defaultHost,
  keyProvider,
  undefined,
);

keyProvider.useCache(true);

self.postMessage({
  type: "ALEO_WORKER_READY",
});

let lastLocalProgram = null;
self.addEventListener("message", (ev) => {
  if (ev.data.type === "ALEO_EXECUTE_PROGRAM_LOCAL") {
    const { localProgram, aleoFunction, inputs, privateKey } = ev.data;

    console.log("Web worker: Executing function locally...");
    let startTime = performance.now();

    (async function () {
      try {
        // Ensure the program is valid and that it contains the function specified
        const program = programManager.createProgramFromSource(localProgram);
        const program_id = program.id();
        if (!program.hasFunction(aleoFunction)) {
          throw `Program ${program_id} does not contain function ${aleoFunction}`;
        }
        const cacheKey = `${program_id}:${aleoFunction}`;

        // Get the program imports
        const imports =
          programManager.networkClient.getProgramImports(localProgram);

        // Get the proving and verifying keys for the function
        if (lastLocalProgram !== localProgram) {
          const keys = programManager.executionEngine.synthesizeKeypair(
            localProgram,
            aleoFunction,
          );
          programManager.keyProvider.cacheKeys(cacheKey, [
            keys.provingKey(),
            keys.verifyingKey(),
          ]);
          lastLocalProgram = localProgram;
        }

        // Pass the cache key to the execute function
        const keyParams = new aleo.AleoKeyProviderParams({
          cacheKey: cacheKey,
        });

        // Execute the function locally
        let response = await programManager.executeOffline(
                localProgram,
                aleoFunction,
                inputs,
                true,
                imports,
                keyParams,
                undefined,
                undefined,
                aleo.PrivateKey.from_string(privateKey)
            );

            // Return the outputs to the main thread
            console.log(`Web worker: Local execution completed in ${performance.now() - startTime} ms`);
            let execution = response.getExecution();
            if (execution) {
                aleo.verifyFunctionExecution(execution, keyProvider.getKeys(cacheKey)[1], program, "hello");
                execution = execution.toString();
                console.log("Execution verified successfully: " + execution);
            } else {
                execution = "";
            }

            self.postMessage({
                type: "OFFLINE_EXECUTION_COMPLETED",
                outputs: {execution: execution}
            });
        } catch (error) {
            console.error(error);
            self.postMessage({
                type: "ERROR",
                errorMessage: error.toString(),
            });
        }
      })();
  }
});

