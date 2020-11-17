import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
  } from 'reactstrap';
  
  
  function Home (props) {
    return (
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md m-1">
            <Card>
                <CardImg src='/assets/iZPxFR.jpg'>

                </CardImg>
            </Card>
          </div>
          <div className="col-12 col-md m-1">
          <Card>
                <CardImg src='/assets/iZPxFR.jpg'>

                </CardImg>
            </Card>
          </div>
          <div className="col-12 col-md m-1">
          <Card>
                <CardImg src='/assets/iZPxFR.jpg'>

                </CardImg>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;