JMeter Load Test Dashboard
This dashboard shows the main metrics gathered during a load test execution with JMeter. This dashboards depends on the [JMeter-InfluxBD-Writer](https://github.com/NovaTecConsulting/JMeter-InfluxDB-Writer/releases) plugin for JMeter, that writes live load test data to an influxDB installation.

### Prerequisites
- Jmeter [download](https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.zip) (version 3.0 or higher)
- Docker [download](https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*zp5o86*_gcl_au*MjQ0NTMyNTMxLjE3NTQ4MTc3MzE.*_ga*NzE0NjMzNzA0LjE3NTQ4MTc3MzE.*_ga_XJWPQMJYHQ*czE3NTQ4MTc3MzEkbzEkZzEkdDE3NTQ4MTc4NTkkajYwJGwwJGgw)
- Grafana (version 3.1 or higher)
- influxDB (version 1.0 or higher)

✅ What You Need to Do
#### 1. Create your_test_plan

   * Add Backend Listener to the plan.
   * Set:

     - Backend Listener implementation: ```rock.nt.apm.jmeter.JMeterInfluxDBBackendListenerClient```

     - Parameters (example):

      |Name |	Value |
      |-----|-------|
      |influxDBHost|localhost|
      |influxDBPort|8086|
      |influxDBUser|jmeter|
      |influxDBPassword|jmeter|
      |influxDBDatabase|jmeter|

#### 2. Start the services:

```
docker-compose up -d
```

#### 3. Access Grafana:

- URL: http://localhost:3000

- Login: admin / admin123

- Add InfluxDB Data Source:

- URL: http://influxdb:8086

- Database: jmeter

- User: jmeter

- Password: jmeter123

#### 4. Import Dashboard:

Use a predefined dashboard like this one:
[Grafana JMeter Dashboard JSON](https://grafana.com/grafana/dashboards/1152-jmeter-load-test/)

### DIAGRAN

```

|jmeter| --data--> [InflucDB] --data--> |Grafana|
   |
   | Http Req
   |
   V
|Nginx|

```
