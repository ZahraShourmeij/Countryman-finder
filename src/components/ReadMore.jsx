import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import company from "../assets/RightContent.png";
import { FaGlobe, FaLock, FaComments, FaRocket } from "react-icons/fa";


export default function ReadMore() {

  useEffect(() => {
  document.body.classList.add("readmore-page");
  return () => document.body.classList.remove("readmore-page");
}, []);

  return (
    <div className="about-us-page w-full">
      {/* Hero Section */}
      <section className="py-5 text-center">
        <Container>
          <h1 className="fw-bold mb-5" style={{ color: "#FCA311" }}>Connecting People Across the World</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            We believe that distance should never break connections. Our mission is
            to make it easy for people to find and communicate with their fellow
            countrymen anywhere in the world.
          </p>

        </Container>
      </section>

      {/* Our Story */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center story-row">
            <Col md={6} className="story-col image-col">
 <img 
          src={company} 
          alt="Description" 
          className="img-fluid"
          style={{ maxWidth: "550px" }} 
        />

            </Col>
            <Col className="story-col text-col">
              <h2 className="fw-bold" style={{ color: "#FCA311" }}>Our Story</h2>
              <p className="text-muted">
                The idea for <strong>Countryman Finder</strong> started in 1402 when we
                realized how difficult it was for people living abroad to find others
                from their home country. We wanted to create a simple yet powerful
                platform that helps people reconnect, share experiences, and build new
                friendships — no matter where they are.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Values */}
      <section className="py-5">
        <Container>
          <h2 className="fw-bold text-center mb-5">Our Mission & Values</h2>
          <Row>
              {[
          { title: "Global Connection", text: "We connect people across borders.", icon: <FaGlobe /> },
          { title: "Privacy First", text: "Your information always stays secure.", icon: <FaLock /> },
          { title: "Meaningful Communication", text: "Talk freely and build real friendships.", icon: <FaComments /> },
          { title: "Continuous Improvement", text: "We keep evolving to serve you better.", icon: <FaRocket /> }
        ].map((item, idx) => (
              <Col xl={3} md={6} sm={12} className="mb-3 mission-card-col" key={idx}>
                <Card className="h-100 text-center p-3 shadow-sm border-0" style={{ borderRadius: "16px" }}>
                  <Card.Body>
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        backgroundColor: "#FFF3E0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                        color: "#FCA311",
                        fontSize: "24px"
                      }}
                    >
                      {item.icon}
                    </div>

                    <Card.Title className="fw-bold">{item.title}</Card.Title>
                    <Card.Text className="text-muted">{item.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Vision */}
      {/* <section className="py-5 text-center">
        <Container>
          <h2 className="fw-bold mb-3">Our Vision</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            We aim to become the most trusted and friendly global platform that
            brings people together and helps them feel at home — anywhere in the
            world.
          </p>
        </Container>
      </section> */}

      {/* CTA */}
      <section className="py-5 text-center" style={{ backgroundColor: "#FCA311", color: "white" }}>
        <Container>
          <h2 className="fw-bold mb-3">Ready to find your countryman?</h2>
          <p>Join thousands of people who've already reconnected worldwide.</p>
          <Button variant="light" className="mt-3 px-4 py-2 rounded-pill fw-bold">
            Start Searching Now
          </Button>
        </Container>
      </section>
    </div>
  );
}