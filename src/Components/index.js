import React from 'react';
import './style.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            colors: [],
            color: ''
        };
    }

    componentDidMount() {
        const colors = JSON.parse(localStorage.getItem('colors')) || [];

        this.setState({
            colors
        });
    }

    addColor = event => {
        event.preventDefault();

        const color = event.target.iColors.value;

        if (this.state.colors.includes(color)) {
            alert('That color was already added!')

            return;
        }

        this.setState({
            colors: [...this.state.colors, color]
        },
            this.updateLocalStorage
        )
    };

    deleteColor = (colorToDelete) => {
        this.setState({
            colors: this.state.colors.filter(color => color !== colorToDelete)
        },
            this.updateLocalStorage
        )
    }

    updateLocalStorage = () => {
        localStorage.setItem('colors', JSON.stringify(this.state.colors))
    }

    setColor = (event) => {
        this.setState({
            color: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div className='showColor' style={{
                    backgroundColor: this.state.color
                }}></div>
                <Form onSubmit={this.addColor}>
                    <Form.Group controlId="formColor">
                        <Form.Label>Color</Form.Label>
                        <Form.Control onChange={this.setColor} name='iColors' type="text" placeholder="Type a color" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div>
                    {
                        this.state.colors.map(color => (
                            <Card key={color} style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{color}</Card.Title>
                                    <Card.Text>
                                        <div className='showColor' style={{
                                            backgroundColor: color
                                        }}></div>
                                    </Card.Text>
                                    <Button onClick={() => this.deleteColor(color)} variant="primary">Borrar</Button>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>
            </div>
        )
    }

}

export default Input