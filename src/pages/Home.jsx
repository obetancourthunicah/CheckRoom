import VerifyHolder from '../components/mediaverification/VerifyHolder';
import VerifyMicro from '../components/microphoneVerification/MicrophoneVerification';

import VerifyVideo from '../components/mediaverification/VerifyVideo';
const Home = ()=> {
    return (
        <>
            <VerifyHolder
                verifiers={[
                    (<VerifyVideo key="verifyVidieo"/>),
                    (<VerifyMicro key="microphone" />),
                    (<div key="accesstoint">Access To Internet</div>)
                ]}
            />
        </>
    )
}

export default Home;