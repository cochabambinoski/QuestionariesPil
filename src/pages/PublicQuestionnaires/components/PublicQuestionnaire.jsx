import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {Col} from 'react-flexbox-grid';
import Link from "react-router-dom/es/Link";
import {questionaryPublicRoute} from "../../../routes/PathRoutes";

const PublicQuestionnaire = ({ questionnaire, handleClick, index }) => {
    return (
        <Col xs={12} md={6} lg={4}>
            <Card className="ui-card-shadow card-content" style={{ background: '#FFF7A933'}}>
                <div className='item'>
                    <div style={{ height: '110px', }}>
                        <div className="card-title">{questionnaire.name}</div>
                        <div>{questionnaire.system ? questionnaire.system.nombre : null}</div>
                        <div className="card-body">{questionnaire.description}</div>
                    </div>
                    <Link to={`${questionaryPublicRoute}${questionnaire.id}`}>
                        <Button label="Responder" className="brown-button" />
                    </Link>
                </div>
            </Card>
        </Col>
    );
};

PublicQuestionnaire.propTypes = {
    questionnaire: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default PublicQuestionnaire;