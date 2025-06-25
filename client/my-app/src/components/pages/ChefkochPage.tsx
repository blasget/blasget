import React, { useState } from 'react'
import "./ChefkochPage.css";
import { Button, Form } from 'react-bootstrap';


function ChefkochPage() {

    const [link, setLink] = useState("")

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("button pressed");
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    type="text"
                    id="chefkochformtext"
                    name="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default ChefkochPage