build:
	docker build -t tibia-dashboard-backend .

run:
	docker run -d -p 3000:3000 tibia-dashboard-backend