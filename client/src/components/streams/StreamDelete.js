import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { deleteStream, fetchStream } from '../../actions';
import { connect } from 'react-redux';

class StreamDelete extends React.Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    onDismiss = () => {
        history.push('/');
    }

    renderActions(){
        const id = this.props.match.params.id;

        return (
            // element '<React.Fragment></React.Fragment>' can always be shortened as '<> </>'
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    } 

    renderContent(){
        if(!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete the stream witn title: ${this.props.stream.title}`
    }

    render(){  
        return (
            <Modal 
                title="Delete Stream" 
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={this.onDismiss}
            />
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(mapStateToProps, { deleteStream, fetchStream }) (StreamDelete);