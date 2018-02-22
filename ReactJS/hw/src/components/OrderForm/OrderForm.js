import React, {Component} from 'react';
import FormHeader from './FormHeader'
import FormInput from './FormInput'
import FormFooter from './FormFooter';
import './style.css';

/*
Сделать компонент формы используя исходный код файлов в приложении:
1. По клику на кнопку "отправить" вывести в console.log все данные с формы.
2*. Сделать валидацию формы.
*/

export default class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('OrderForm input fields vals: ');
        let p = document.querySelectorAll('#form_1 input');
        for (let i of p) {
            if (i.type !== 'reset' && i.type !== 'submit')
                console.log(i.name + ": " + i.value);
        }
    };

    render() {
        return (
            <div>
                <FormHeader class="h" formHeader="Форма оформления заказа"/>
                <form id={this.props.id} method={this.props.formMethod} action={this.props.formAction}
                      name={this.props.formName} onSubmit={this.handleSubmit}>
                    <FormInput class="pad" labelCaption="ФИО" id="f1" nameAttr="FIO" required="true"/>
                    <FormInput class="pad" type="email" labelCaption="E-mail" id="e2" nameAttr="e-mail"
                               required="true"/>
                    <FormInput class="pad" type="tel" labelCaption="Телефон" id="p3" nameAttr="phone"
                               placeholder="xxx-xxx-xxxx"/>
                    <FormInput class="pad" type="number" labelCaption="Количество" id="k2" nameAttr="quantity"
                               required="true"/>
                    <FormInput class="pad" type="date" labelCaption="Дата доставки" id="d2"
                               nameAttr="date" required="true"/>
                    <FormFooter classSub="sub" classFooter="footer"/>
                </form>
            </div>
        );
    }
}