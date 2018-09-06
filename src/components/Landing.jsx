import React, {Component} from 'react'
import {Card, CardBody, CardHeader, CardFooter} from 'reactstrap'

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newAccount: false
        }
    }
    
    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        JOT-DOWN
                    </CardHeader>
                    <CardBody>
                        BODY
                    </CardBody>
                    <CardFooter>
                        FOOTER
                    </CardFooter>
                </Card>
            </div>
        )
    }
}

export default Landing