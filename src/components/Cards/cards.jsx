import { useSelector } from 'react-redux'
import style from './cards.module.css'

import Card from '../Card/card';

export default function Cards({ countries }) {

    return (
        <>
            <div className={style.cards}>
                {countries?.map(country =>
                    <Card
                        name={country.name}
                        flag={country.flag}
                        continent={country.continent}
                        id={country.id}
                        key={country.id}
                    />
                )}
            </div>
        </>
    )
}