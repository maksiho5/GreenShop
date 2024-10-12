import React, { useState } from 'react';
import './Authorization.css'
import Regisranion from './Regisranion/Regisranion'
import Login from './Login/Login';
function Authorization({ setShowOverlay }: { setShowOverlay: (show: boolean) => void }): JSX.Element {
    // const [closest, setClosest] = useState(true);
    const [check, setСheck] = useState(true);

    const handleClose = (event: React.MouseEvent<HTMLImageElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('closest')) {
            setShowOverlay(false)
        }


        
    };
    const choiceEntrance = (e: React.MouseEvent<HTMLSpanElement>): void => {
        const target = e.target as HTMLElement;
        if (target.className == "log") {
            setСheck(true)
        } else {
            setСheck(false)
        }

    }
    return (
        <>
        
                <div className="overlay" onClick={handleClose}>
                    <div className="authorization_reg">
                        <img src="public/closet.svg" alt="" className='closest' />
                        {check ? <Login choiceEntrance={choiceEntrance} /> : <Regisranion choiceEntrance={choiceEntrance} />}
                    </div>
                </div>
            
        </>
    );
}

export default Authorization