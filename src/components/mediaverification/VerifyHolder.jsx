import { useCallback, useState } from "react";
import { PrimaryButton } from "../buttons/BaseButton";

const VerifyHolder = ( { verifiers = [] } )=>{
    const [currentVerifier, setCurrenVerifier] = useState(0);
    const showNext = ()=>{
        if (currentVerifier + 1 !== verifiers.length) {
            setCurrenVerifier(currentVerifier + 1);
        }
    }

    const showPrevious = ()=>{
        if (currentVerifier - 1 !== -1) {
            setCurrenVerifier(currentVerifier -1);
        }
    }


    return (
        <section className="verifyHolder">
            {verifiers[currentVerifier]}

            <div style={{display:'flex', justifyContent:'space-between'}}>
                {currentVerifier !== 0 &&<PrimaryButton onClick={showPrevious}>Previous</PrimaryButton>}
                {currentVerifier !== (verifiers.length-1) &&<PrimaryButton onClick={showNext}>Next</PrimaryButton>}
            </div>
        </section>
    );
}

export default VerifyHolder;