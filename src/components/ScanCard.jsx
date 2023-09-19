import StyleCard from "./StyleCard";
import { useEffect, useState } from "react";
import { useAleoWASM } from "../aleo-wasm-hook";
import Issuer from "../components/Issuer";
import Holder from "../components/Holder";
import Verifier from "../components/Verifier";
import Request from "../components/Request";
import { Button } from "antd";
import scan_image from "../assets/Images/scan.png";
import issue_image from "../assets/Images/issue-icon.png";
import InputModule from "./InputModule";
import IssuerDetail from "./IssuerDetail";
import ZpassAdded from "./ZpassAdded";
import Age from "./Age";
import Verified from "./Verified";
import Verify from "./Verify";


const HELLO_PROGRAM = `
    program hello_hello.aleo;
    function hello:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;
`;

const ScanCard = () => {

    const aleo = useAleoWASM();

    const [state, setState] = useState({
        account: null,
        loading: false,
        subject: '',
        issuer: '',
        dob: '',
        expiration: '',
        signature: '',
        verified: false,
        step: 0,
        result: 0
    });
    console.log({ state })
    const [worker, setWorker] = useState(null);

    const setIssuer = (issuerValue) => {
        console.log({ issuerValue })
        setState(prev => ({ ...prev, issuer: issuerValue }));
    };

    const setSubject = (subjectValue) => {
        setState(prev => ({ ...prev, subject: subjectValue }));
    };

    const setExpiration = (expirationValue) => {
        setState(prev => ({ ...prev, expiration: expirationValue }));
    };

    const setSignature = (signatureValue) => {
        setState(prev => ({ ...prev, signature: signatureValue }));
    };

    const setDOB = (dob) => {
        setState(prev => ({ ...prev, dob: dob }));

    }
    const setAccount = (account) => {
        setState(prev => ({ ...prev, account: account }));

    }



    const signString = (str) => {
        if (!str || !state.account) return;
        return state.account.sign(str);
    };

    const generateAccount = () => {
        setState(prev => ({ ...prev, account: new aleo.PrivateKey() }));
    };

    const generateSignature = () => {
        const str = `${state.subject}${state.issuer}${state.dob}${state.expiration}2023field21field`;
        const generatedSignature = signString(str);
        setState(prev => ({ ...prev, signature: generatedSignature.to_string() }));
    };

    const spawnWorker = () => new Worker(new URL("../workers/worker.js", import.meta.url), { type: "module" });

    const postMessagePromise = (worker, message) => new Promise((resolve, reject) => {
        worker.onmessage = (event) => resolve(event.data);
        worker.onerror = (error) => reject(error);
        worker.postMessage(message);
    });

    const advanceStep = () => {
        console.log("called")
        setState(prev => ({ ...prev, step: prev.step + 1 }))
    };
    const backStep = () => setState(prev => ({ ...prev, step: prev.step - 1 }));

    const execute = async () => {
        console.log("execute called:: ", state.account)

        setState(prev => ({ ...prev, loading: true }));
        const response = await postMessagePromise(worker, {
            type: "ALEO_EXECUTE_PROGRAM_LOCAL",
            localProgram: HELLO_PROGRAM,
            aleoFunction: "hello",
            inputs: ["5u32", "5u32"],
            privateKey: state.account.to_string(),
        });
        setState(prev => ({ ...prev, loading: false, result: response, verified: true }));
        advanceStep();
    };

    const initializeAndAdvance = () => {
        generateAccount();
        advanceStep();
    };

    useEffect(() => {
        if (worker === null) {
            const spawnedWorker = spawnWorker();
            setWorker(spawnedWorker);
            return () => spawnedWorker.terminate();
        }
    }, []);

    // const componentMap = {
    //     0: <div className="center"><button className="button" onClick={initializeAndAdvance}>Initialize zPass</button></div>,
    //     1: <Issuer {...state} generateAccount={generateAccount} generateSignature={generateSignature} advanceStep={advanceStep} setIssuer={setIssuer} setExpiration={setExpiration} setSubject={setSubject} />,
    //     2: <Request {...state} advanceStep={advanceStep} backStep={backStep} />,
    //     3: <Holder {...state} execute={execute} advanceStep={advanceStep} backStep={backStep} />,
    //     4: <Verifier {...state} execute={execute} advanceStep={advanceStep} backStep={backStep} />
    // };
    const componentMap = {
        0: <div className="scan-container">
            <div className="scan-item">
                <img src={scan_image} className="scan-image" alt="Scan Passport" />
                <Button className="scan-button">Scan a Passport</Button>
                <span className="coming-soon-text">(Coming Soon)</span>
            </div>
            <div className="divider" />
            <div className="scan-item">
                <img src={issue_image} className="issue-image" alt="Scan Issue" />
                <Button className="scan-issue-button text-white" onClick={() => {
                    generateAccount();
                    advanceStep()
                }}>
                    Scan an Issue
                </Button>
            </div>
        </div>,
        1: <InputModule {...state} generateAccount={generateAccount} setAccount={setAccount} setSignature={setSignature} generateSignature={generateSignature} advanceStep={advanceStep} setDob={setDOB} setIssuer={setIssuer} setExpiration={setExpiration} setSubject={setSubject} />,
        2: <IssuerDetail {...state} execute={execute} generateAccount={generateAccount} generateSignature={generateSignature} advanceStep={advanceStep} setIssuer={setIssuer} setExpiration={setExpiration} setSubject={setSubject} />,
        3: <ZpassAdded {...state} advanceStep={advanceStep} backStep={backStep} />,
        3: <Verify {...state} advanceStep={advanceStep} backStep={backStep} />,
        4: <Age {...state} execute={execute} advanceStep={advanceStep} backStep={backStep} />,
        5: <Verified {...state} execute={execute} advanceStep={advanceStep} backStep={backStep} />
    };



    useEffect(() => {
        console.log("in scan")
    }, [])
    return (
        <>
            <StyleCard>
                {componentMap[state.step] || <div>Completed</div>}
                {/* uuuiu */}

            </StyleCard>

        </>
    )
}

export default ScanCard