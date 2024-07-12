import VerifyHolder from '../components/mediaverification/VerifyHolder';

import VerifyVideo from '../components/mediaverification/VerifyVideo';
const Home = ()=> {
    return (
        <>
            <VerifyHolder
                verifiers={[
                    (<VerifyVideo key="verifyVidieo"/>),
                    (<div key="microphone">Microphone</div>),
                    (<div key="accesstoint">Access To Internet</div>)
                ]}
            />
        </>
    )
}

export default Home;