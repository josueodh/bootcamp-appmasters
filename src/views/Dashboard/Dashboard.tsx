import React, { useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
import Cloud from "@material-ui/icons/Cloud";
import WarningIcon from '@material-ui/icons/Warning';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardDashboard from "../../components/CardDashboard";
import BasicPaginantion from "../../components/BasicPagination/BasicPagination";
import Select from "../../components/CustomSelect/SelectText";
import SearchInput from "../../components/CustomInput/SearchInput";
import CustomInput from "../../components/CustomInput/CustomInput";
import { InputLabel, Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';


import moment from "moment";
import "moment/locale/pt-br";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  pieChart,
} from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

import api from '../../server/api';
import { title } from "../../assets/jss/material-dashboard-react";

interface Props {
  classes: any;
}

interface State {
  value: number;
  data: Array<any>;
  region: Array<any>;
  totalRegion: Array<any>;
  result: Array<any>;
  dailySalesChart: Array<any>;
  barChart: Array<any>;
  currentPage: number,
  statePerPage: number,
  brazil: Array<any>,
  search: string,
}

interface Response {
  uid: number;
  uf: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string;
}

interface Region {
  North: Array<any>
  South: Array<any>
  Southeast: Array<any>
  Midwest: Array<any>
  Northeast: Array<any>
}

/*
const mockData: CardDash[] = [
  {
    type: "success",
    icon: <Store />,
    title: this.state.data,
    value: "$34,245",
    footerIcon: <DateRange />,
    footerLabel: "Last 24 Hours",
  },
  {
    type: "warning",
    icon: <Icon>content_copy</Icon>,
    title: "Used Space",
    value: "49/50",
    footerIcon: <Warning />,
    footerLabel: "Get more space",
  },
  {
    type: "danger",
    icon: <Icon>info_outline</Icon>,
    title: "Fixed Issues",
    value: "75",
    footerIcon: <LocalOffer />,
    footerLabel: "Tracked from Github",
  },
  {
    type: "info",
    icon: <Accessibility />,
    title: "Followers",
    value: "+245",
    footerIcon: <Update />,
    footerLabel: "Just Updated",
  },
];*/

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      data: [],
      region: [],
      totalRegion: [0, 0, 0, 0, 0],
      result: [],
      dailySalesChart: [],
      barChart: [],
      currentPage: 1,
      statePerPage: 5,
      brazil: [],
      search: '',
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

  handleSearch = (event: any) => {
    console.log(event.target.value, 'alo');
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  filterByRegion = () => {
    //linha para auxiliar na filtragem
    let region = this.state.data;
    region = region.map((element) => {
      let region = this.getByRegion(element);
      element.region = region;
      return element;
    })
    this.setState({ region: region });
  }
  getByRegion = (element: any) => {
    if (element.uid < valueForState.MA) {
      this.state.totalRegion[0] += element.cases;
      return 'North';
    } else {
      if (element.uid >= valueForState.MA && element.uid < valueForState.MG) {
        this.state.totalRegion[1] += element.cases;
        return 'Northeast';
      } else {
        if (element.uid >= valueForState.MG && element.uid < valueForState.PR) {
          this.state.totalRegion[2] += element.cases;
          return 'Southeast';
        } else {
          if (element.uid >= valueForState.PR && element.uid < valueForState.MS) {
            this.state.totalRegion[3] += element.cases;
            return 'South';
          } else {
            this.state.totalRegion[4] += element.cases;
            return 'Midwest';
          }
        }
      }
    }
  }
  async componentDidMount() {
    const response = await api.get('').then((res) => res.data) as { data: Response[] };
    this.setState({ data: response.data });
    const responseBrazil = await api.get('/brazil').then(res => res.data);
    this.setState({ brazil: [responseBrazil.data.cases, responseBrazil.data.recovered] })
    this.filterByRegion();
    this.filterByState('SP');
    this.attCharts();
  }
  filterByState = (parameter: string) => {
    let result = this.state.data;
    result = result.filter((element) => {
      return element.uf == parameter;
    })
    this.setState({ result: result });
  }
  attCharts = () => {
    this.setState({
      dailySalesChart: this.state.data
        .sort((a: any, b: any) => (a.uf > b.uf ? 1 : -1))
        .map(element => element.cases)
    })

  }


  render() {
    const { classes } = this.props;
    let filter = this.state.data.filter(data => {
      return data.state.indexOf(this.state.search) !== -1
    });
    const indexOfLastState = this.state.currentPage * this.state.statePerPage;
    const indexOfFisrtState = indexOfLastState - this.state.statePerPage;
    const paginate = (pageNumber: number) => {
      this.setState({ currentPage: pageNumber })
    }

    return (
      <div>
        <Select />
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <CardDashboard
              classes={classes}
              color={'info'}
              icon={<LocalHospitalIcon />}
              title={'Número de casos'}
              value={(this.state.result.length) ? this.state.result[0].cases : 0}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <CardDashboard
              classes={classes}
              color={'warning'}
              icon={<WarningIcon />}
              title={'Número de suspeitos'}
              value={(this.state.result.length) ? this.state.result[0].suspects : 0}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <CardDashboard
              classes={classes}
              color={'success'}
              icon={<AssignmentTurnedInIcon />}
              title={'Número de curados'}
              value={(this.state.result.length) ? this.state.result[0].refuses : 0}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <CardDashboard
              classes={classes}
              color={'danger'}
              title={'Número de mortos'}
              icon={< ClearIcon />}
              value={(this.state.result.length) ? this.state.result[0].deaths : 0}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart={true}>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
                    series: [this.state.dailySalesChart]
                  }}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Número de Casos por Estado</h4>
                <p className={classes.cardCategory} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart={true}>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: ['Norte', 'Nordeste', 'Sul', 'Sudeste', 'Centro-Oeste'],
                    series: [this.state.totalRegion]
                  }}
                  type="Bar"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Casos por região</h4>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart={true}>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={{ labels: ['Mortes', 'Curados'], series: this.state.brazil }}
                  type="Pie"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Mortes x Curados</h4>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
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
                      tableHead={["Posição", "Estado", "Casos", "Confirmados", "Curados", "Atualizado"]}
                      tableData={this.state.region.filter(a => a.region == "Southeast").sort((a, b) => (a.uf > b.uf ? 1 : -1)).map(item => {
                        return [
                          item.uf,
                          item.state,
                          item.cases,
                          item.deaths,
                          item.suspects,
                          moment(item.datetime).fromNow(),
                        ]
                      })}
                    />
                  ),
                },
                {
                  tabName: "Norte",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Posição", "Estado", "Casos", "Confirmados", "Curados", "Atualizado"]}
                      tableData={this.state.region.filter(a => a.region == "North").sort((a, b) => (a.uf > b.uf ? 1 : -1)).map(item => {
                        return [
                          item.uf,
                          item.state,
                          item.cases,
                          item.deaths,
                          item.suspects,
                          moment(item.datetime).fromNow(),
                        ]
                      })}
                    />
                  ),
                },
                {
                  tabName: "Centro-Oeste",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Posição", "Estado", "Casos", "Confirmados", "Curados", "Atualizado"]}
                      tableData={this.state.region.filter(a => a.region == "Midwest").sort((a, b) => (a.uf > b.uf ? 1 : -1)).map(item => {
                        return [
                          item.uf,
                          item.state,
                          item.cases,
                          item.deaths,
                          item.suspects,
                          moment(item.datetime).fromNow(),
                        ]
                      })}
                    />
                  ),
                },
                {
                  tabName: "Nordeste",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Posição", "Estado", "Casos", "Confirmados", "Curados", "Atualizado"]}
                      tableData={this.state.region.filter(a => a.region == "Northeast").sort((a, b) => (a.uf > b.uf ? 1 : -1)).map(item => {
                        return [
                          item.uf,
                          item.state,
                          item.cases,
                          item.deaths,
                          item.suspects,
                          moment(item.datetime).fromNow(),
                        ]
                      })}
                    />
                  ),
                },
                {
                  tabName: "Sul",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Posição", "Estado", "Casos", "Confirmados", "Curados", "Atualizado",]}
                      tableData={this.state.region.filter(a => a.region == "South").sort((a, b) => (a.uf > b.uf ? 1 : -1)).map(item => {
                        return [
                          item.uf,
                          item.state,
                          item.cases,
                          item.deaths,
                          item.suspects,
                          moment(item.datetime).fromNow(),

                        ]
                      })}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <form className="float-right">
                  <Grid container alignItems="flex-end">
                    <Grid item>
                      <SearchIcon></SearchIcon>
                    </Grid>
                    <Grid item>
                      <TextField
                        className="float-right"
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value })}
                      />
                    </Grid>
                  </Grid>
                </form>
                <h4 className={classes.cardTitleWhite}>Todos os Estados</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["UF", "Estado", "Casos", "Mortes", "Suspeitos", "Atualizado"]}
                  tableData={filter.sort((a, b) => (b.cases - a.cases)).slice(indexOfFisrtState, indexOfLastState).map(item => {
                    return [
                      item.uf,
                      item.state,
                      item.cases,
                      item.deaths,
                      item.suspects,
                      moment(item.datetime).fromNow(),
                    ]
                  })}
                />
                <BasicPaginantion statePerPage={this.state.statePerPage} totalState={27} currentPage={this.state.currentPage} paginate={paginate}></BasicPaginantion>
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
enum valueForState {
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