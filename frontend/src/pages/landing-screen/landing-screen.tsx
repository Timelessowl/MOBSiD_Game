/* eslint-disable */
import React from 'react';
import {Form, Button, Navbar, NavbarBrand, NavItem, Label, FormGroup} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAllTests} from '../../store/tests-data/selectors';
import {TestData} from '../../types/state';


const LandingScreen: React.FC = () => {


  const navigate = useNavigate();
  const totalTests: TestData[] = useAppSelector(getAllTests);

  const handleAuthButtonClick = () => (
    navigate(AppRoute.Auth)
  );


  const handleTestSelect = (testId : number) => {
    navigate(`/game/${testId}`);
  };

  return (
    <div>
      <nav style={{marginBottom: '1rem' }}>
        <Navbar color='dark' dark>
          <NavbarBrand>MOBSiD Game</NavbarBrand>
          <NavItem>
            <Button onClick={handleAuthButtonClick} className="form_btn" variant="light">Authorisation</Button>
          </NavItem>
        </Navbar>
      </nav>
      <div style={{ display: 'flex', height: 'calc(100vh - 3rem)', paddingLeft: '3rem'}}>
        <div style={{display: 'grid', alignItems: 'right', justifyContent: 'center', height: '50vh'}}>
          <Form>
            <Label className="question">
              Выберите тест
            </Label>

            {
              totalTests.map((test, i) =>
                (
                  <FormGroup key={test['testId']}>
                    <Button key={test['testId']} variant="primary" onClick={() => handleTestSelect(test['testId'])}>
                      {`${test['title']}`}
                    </Button>
                  </FormGroup>
                )
              )
            }
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
