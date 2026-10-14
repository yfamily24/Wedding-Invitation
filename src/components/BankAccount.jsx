import { useState } from 'react';
import { config } from '../config';
import Divider from './Divider';

function BankCard({ logo_detail, logo, detail, name, type }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(detail);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Gagal copy:', err);
        }
    };

    if(type === 'Address'){
        return (
            <div className="gift__card">
                <div className="gift__logo">
                    <img className="gift__img" src={logo} alt={logo_detail} />
                </div>
                <div className="gift__name">
                    <b>Penerima:</b>
                    <br/>
                    {name}
                </div>
                <div className="gift__name">
                    <b>Alamat:</b>
                    <br/>
                    {detail}
                </div>
                <div className="gift-card">
                    <button type="button" className="gift-card__btn" onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                
            </div>
        );
    }else if(type === 'Bank'){
        return (
            <div className="bank-card">
                <img className="bank-card__logo" src={logo} alt={logo_detail} />
                {/* <img className="bank-card__chip" src={config.chipLogo} alt={logo_detail} /> */}
                <div className="bank-card__number">{detail}</div>
                <div className="bank-card__name">{name}</div>
                <div>
                    <button type="button" className="bank-card__copy" onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                
            </div>
        );
        
    }
    
}

export default function BankAccount() {
    return (
        <section id="bank-account" className="center reveal">
            <h2 className="serif" style={{ fontSize: 34, color: '#fff', marginTop: 6 }}>
                Wedding Gift
            </h2>
            <Divider />
            <p>
                Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi melalui dibawah ini.
            </p>

            <BankCard {...config.gift.ilham} />
            <BankCard {...config.gift.devi} />
            <BankCard {...config.gift.rumah} />


            
        </section>
    );
}
