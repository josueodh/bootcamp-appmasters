import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Button from "../../components/Button/Button";

import { bugs, website, server } from "../../variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

import api from '../../server/api';

interface Props {
  classes: any;
}

interface State {
  value: number;
  dados: Array<any>;
  totalCases: Array<any>;
  country: Array<any>;
  region: Array<any>;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      dados: [],
      totalCases: [{ "cases": 0, "deaths": 0, "suspects": 0, "refuses": 0 }],
      country: [],
      region:[{
        "North":[],"South":[],"Southeast":[],"Midwest":[], "Northeast":[],
      }]

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }
  handleChange = (event: any, value: number, teste: number) => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  calcTotalCases(): void {
    let totalCases = this.state.totalCases;
    let arrayOfElements = this.state.dados;
    arrayOfElements.forEach(function (object) {
      totalCases[0].cases += object.cases;
      totalCases[0].deaths += object.deaths;
      totalCases[0].suspects += object.suspects;
      totalCases[0].refuses += object.refuses;
    })
    this.setState({ totalCases: totalCases });
  };
  transformObjectinArrayOfArray(object: Array<any>) {
    return object.map(obj =>
      Object.values(obj)
    );
  }
  async Top4Country() {
    console.log('ativo');
    const resposendeCountry = await api.get('countries');
    let object = resposendeCountry.data.data;
    let arrayOfElements = this.transformObjectinArrayOfArray(object);
    let newArray: Array<any> = [];
    arrayOfElements.sort((a: any, b: any) => b[1] - a[1]);
    arrayOfElements.forEach((element, index) => {
      element.unshift(index + 1);
      newArray = [...newArray, element.slice(0, 5)];
    })
    this.setState({ country: newArray.splice(0, 5) });
  }

  async filterByRegion() {

  }

  async componentDidMount() {
    const response = await api.get('');
    this.setState({ dados: response.data.data });
    this.calcTotalCases();
    this.Top4Country();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats={true} icon={true}>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Tota de Casos</p>
                <h3 className={classes.cardTitle}>{this.state.totalCases[0].cases}</h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <DateRange />
                  Últimas 24 Horas
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats={true} icon={true}>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Suspeitos</p>
                <h3 className={classes.cardTitle}>{this.state.totalCases[0].suspects}</h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats={true} icon={true}>
                <CardIcon color="success">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Curados</p>
                <h3 className={classes.cardTitle}>{this.state.totalCases[0].refuses}</h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats={true} icon={true}>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Mortes</p>
                <h3 className={classes.cardTitle}>{this.state.totalCases[0].deaths}</h3>
              </CardHeader>
              <CardFooter stats={true}>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart={true}>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart={true}>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart={true}>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Por região:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Sudeste",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Posição", "Estado", "Casos", "Confirmados", "Curados"]}
                      tableData={this.state.country}
                    />
                  ),
                },
                {
                  tabName: "Norte",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Posição", "Estado", "Casos", "Confirmados", "Curados"]}
                      tableData={this.state.country}
                    />
                  ),
                },
                {
                  tabName: "Centro-Oeste",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Posição", "Estado", "Casos", "Confirmados", "Curados"]}
                      tableData={this.state.country}
                    />
                  ),
                },
                {
                  tabName: "Nordeste",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Posição", "Estado", "Casos", "Confirmados", "Curados"]}
                      tableData={this.state.country}
                      total={10}
                    />
                  ),
                },
                {
                  tabName: "Sul",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Posição", "Estado", "Casos", "Confirmados", "Curados",]}
                      tableData={this.state.country}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <Button className="float-right" name="Buscar" />
                <h4 className={classes.cardTitleWhite}>Países com mais casos</h4>
                <p className={classes.cardCategoryWhite}>
                  Atualizado desde 01/08/2020
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Posição", "País", "Casos", "Confirmados", "Curados"]}
                  tableData={this.state.country}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);

/*
Região Norte de 11 a 17
Região Nordeste 21 a 29
Região Sudeste 31 a 35
Região Sul 41 a 43
Região Centro-Oeste 50 a 53
*/
enum valurForState {
  RO = 11,
  AC,
  AM,
  RR,
  PA,
  AP,
  TO,
  MA = 21,
  PI,
  CE,
  RN,
  PB,
  PE,
  AL,
  SE,
  BA,
  MG = 31,
  ES,
  RJ,
  SP = 35,
  PR = 41,
  SC,
  RS,
  MS = 50,
  MT,
  GO,
  DF,
}