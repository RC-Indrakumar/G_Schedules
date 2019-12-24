FROM jetty:9.4.18-jre11
RUN rm -rf /var/lib/jetty/webapps/*
COPY /build/libs/G_Schedules.war /var/lib/jetty/webapps/ROOT.war
EXPOSE 8080