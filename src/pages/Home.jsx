import VerifyHolder from '../components/mediaverification/VerifyHolder';
import VerifyVideo from '../components/mediaverification/VerifyVideo';
import VerifyMicro from '../components/microphoneVerification/MicrophoneVerification';
import VerifyInternet from '../components/internetVerification/InternetVerification';


const Home = ()=> {
    return (
        <>
            <VerifyHolder
                verifiers={[
                    (<VerifyVideo key="verifyVidieo"/>),
                    (<VerifyMicro key="microphone" />),
                    (<VerifyInternet key="accesstoint" />)
                ]}
            />
        </>
    )
}

export default Home;