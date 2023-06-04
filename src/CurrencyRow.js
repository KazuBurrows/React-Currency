import React from 'react'
import * as uuid from 'uuid';

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props;


    return (
        <div>
            <input type="number" value={amount} onChange={onChangeAmount}/>
            {/*'{selectedCurrency}' is current selected state in options*/}
            {/*'{onChangeCurrency}' is a trigger to change 'selectedCurrency' state*/}
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => {
                    return <option key={uuid.v4()} value={option}>{option}</option>
                })}
            </select>
        </div>

    )

}