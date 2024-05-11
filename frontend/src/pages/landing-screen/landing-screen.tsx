/* eslint-disable */
import React from 'react';
import {Form, Button, Navbar, NavbarBrand, NavItem, Label, FormGroup} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAllTests} from '../../store/tests-data/selectors';
import {TestData} from '../../types/state';
import {store} from '../../store';
import {fetchUsersData, setActiveTest} from '../../store/api-actions';
import {getUserData} from '../../store/user-process/selectors';


const LandingScreen: React.FC = () => {


  const navigate = useNavigate();
  const totalTests: TestData[] = useAppSelector(getAllTests);
  const user = useAppSelector(getUserData)

  const handleAuthButtonClick = () => (
    navigate(AppRoute.Auth)
  );


  const handleTestSelect = (testId : number) => {
    if (user?.activeTestId === undefined){
      store.dispatch(setActiveTest({testId}));
      navigate(`/game/${testId}`);
    }
    else {
      navigate(`/game/${testId}`);
    }
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
                    <Button key={test['testId']}
                            variant="primary"
                            onClick={() => handleTestSelect(test['testId'])}
                            disabled={(user?.activeTestId !== test['testId']) || user?.activeTestId === undefined}
                    >
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
