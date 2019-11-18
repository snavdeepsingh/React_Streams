import React from 'react';
import { Field, reduxForm } from 'redux-form';
// Field starts with UpperCase because it is a React Component. reduxForm starts with 
// lowercase because it is a function. It is just like connect and has the exact same functionality.
import { connect } from 'react-redux';
import { createStream } from '../../actions'


class StreamCreate extends React.Component{

    renderError ({ error, touched }){
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput= ({ input, label, meta }) =>{
        // above code is destructured formValues object

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`

        // return <input onChange={formProps.input.onChange} value={formProps.input.value} />

        // following input  code is shorter version of the code above. jsx syntax

        return (
           
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) =>{
        this.props.createStream(formValues);
    }


    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} type="text" label="Enter Title" />
                <Field name="description" component={this.renderInput}  type="text" label="Enter Description" />
                <button className="ui button primary" >Submit</button>
            </form>
        )
    }
};

const validate = (formValues) => {
    const errors = {};
    
    if(!formValues.title){
        errors.title = 'You must enter a title'
    }

    if(!formValues.description){
        errors.description = "You must enter a description"
    }

    return errors;
}

const formWrapped =  reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);


export default connect(null, {createStream})(formWrapped);