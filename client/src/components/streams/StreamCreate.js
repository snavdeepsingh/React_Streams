import React from 'react';
// Field starts with UpperCase because it is a React Component. reduxForm starts with 
// lowercase because it is a function. It is just like connect and has the exact same functionality.
import { connect } from 'react-redux';
import { createStream } from '../../actions'
import StreamForm from './StreamForm';


class StreamCreate extends React.Component{

    onSubmit = (formValues) =>{
        this.props.createStream(formValues);
    }


    render(){
        return (
           <div>
               <h3>Create a Stream</h3>
               <StreamForm onSubmit={this.onSubmit} />
           </div>
        )
    }
};



export default connect(null, {createStream})(StreamCreate);