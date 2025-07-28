.PHONY: all re fclean build up

all: build up

build:
	@echo "📦 Building Docker images..."
	@docker-compose build --no-cache > /dev/null 2>&1
	@echo "✅ Docker images built successfully."

up:
	@echo "🚀 Starting Docker containers..."
	@docker-compose up -d --remove-orphans > /dev/null 2>&1
	@echo "✅ Docker containers started successfully."
	@echo " -------------------------------------------- "
	@echo "🌐 Access the website at http://localhost:8080"

re: fclean build up

fclean:
	@echo "🧹 Cleaning Docker containers, images, and volumes..."
	@docker-compose down -v --rmi all > /dev/null 2>&1
	@echo "✅ Docker cleanup completed successfully."

help:
	@echo "Available commands:"
	@echo "  make         - Build and start Docker containers"
	@echo "  make build   - Only build Docker images"
	@echo "  make up      - Only start Docker containers"
	@echo "  make re      - Full rebuild: clean, build, and start"
	@echo "  make fclean  - Full clean: stop and remove all containers, images, and volumes"
