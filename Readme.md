JMeter Load Test Dashboard
This dashboard shows the main metrics gathered during a load test execution with JMeter. This dashboards depends on the [JMeter-InfluxBD-Writer](https://github.com/NovaTecConsulting/JMeter-InfluxDB-Writer/releases) plugin for JMeter, that writes live load test data to an influxDB installation.

### Prerequisites
- Jmeter [download](https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.zip) (version 3.0 or higher)
  - Download the [JMeter-InfluxBD-Writer](https://github.com/NovatecConsulting/JMeter-InfluxDB-Writer/releases/download/v-1.0/JMeter-InfluxDB-Writer-1.0.jar) and paste the jar into the /lib/ext directory of your JMeter installation. (Then Restart JMeter) 
- Docker [download](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*1vxfhp0*_gcl_au*MjQ0NTMyNTMxLjE3NTQ4MTc3MzE.*_ga*NzE0NjMzNzA0LjE3NTQ4MTc3MzE.*_ga_XJWPQMJYHQ*czE3NTQ4MTc3MzEkbzEkZzEkdDE3NTQ4MTc4NTkkajYwJGwwJGgw)

- nodejs [download](https://nodejs.org/dist/v22.19.0/node-v22.19.0-x64.msi)
- xampp  [download](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe/download)
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

### Set up api
1. dowmload xampp,  ruen apache and mysql
2. go tp phpmyadmin
3. create database name api
4. run
```
npx prisma migrate dev
npx prisma genarated
```
5.run ``` npm start ```

