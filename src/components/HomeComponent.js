import {Card, CardImg, Jumbotron, Media, Button} from 'reactstrap';
import Axios from 'axios';

function Home (props) {
  
  return (
    <div className="container">
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-md-6">
              <h1>
                Dunder Mifflin Paper Company
              </h1>
              <p>
                "To avoid illness, expose yourself to germs, enabling your immune system to develop antibodies. I don't know why everyone doesn't do this... Maybe they have something against living forever."

              </p>
            </div>
            <div className="col-12 col-md-6">
              <Media
                height="250"
                src="assets/Character_-_MichaelScott.PNG.png"
               
              />
            </div>
          </div>
        </div>
      </Jumbotron>
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <Card>
            <CardImg src="/assets/iZPxFR.jpg" />
          </Card>
        </div>
        <div className="col-12 col-md m-1">
          <Card>
            <CardImg src="/assets/iZPxFR.jpg" />
          </Card>
        </div>
        <div className="col-12 col-md m-1">
          <Card>
            <CardImg src="/assets/iZPxFR.jpg" />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
