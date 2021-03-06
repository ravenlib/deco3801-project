import { observable, action } from 'mobx';
import _ from 'lodash';

class HelpStore {

    /* state for managing the active Faq */
    @observable activeIndex = 0;

    /* Object for storing form values  */
    @observable form = {
        firstname: '',
        lastname: '',
        email: '',
        text: ''
    }

    /* Clear form values */
    @action
    clear = () => {
        this.form = _.mapValues(this.form, () => '');
    }

    /* Set key value for form */
    @action
    updateFormKeyValue = (key, value) => {
        this.form[key] = value;
    }
}

export default new HelpStore();