.PHONY: all re fclean build up backend-dev stop clean

# Regla por defecto: construye y levanta los contenedores
all: build up

# Construye las imágenes de Docker
build:
	@echo "📦 Building Docker images..."
	@docker-compose build --no-cache > /dev/null 2>&1
	@echo "✅ Docker images built successfully."

# Levanta los contenedores de Docker
up:
	@echo "🚀 Starting Docker containers..."
	@docker-compose up -d --remove-orphans > /dev/null 2>&1
	@echo "✅ Docker containers started successfully."
	@echo " -------------------------------------------- "
	@echo "🌐 Frontend: http://localhost:8080"
	@echo "🔧 Backend: http://localhost:3000"
	@echo "📊 Backend Health: http://localhost:3000/health"

# Reconstruye completamente: detiene, limpia, construye y levanta
re: fclean build up

# ✅ NUEVO: Solo detener contenedores (mantiene datos)
stop:
	@echo "⏹️ Stopping Docker containers..."
	@docker-compose down > /dev/null 2>&1
	@echo "✅ Docker containers stopped (data preserved)."

# ✅ NUEVO: Limpiar sin eliminar volúmenes (mantiene datos)
clean:
	@echo "🧹 Cleaning Docker containers and images (preserving data)..."
	@docker-compose down --rmi all > /dev/null 2>&1
	@echo "✅ Docker cleanup completed (data preserved)."

# ✅ MODIFICADO: Limpia completamente incluyendo datos
fclean:
	@echo "🧹 Cleaning Docker containers, images, and volumes..."
	@echo "⚠️  WARNING: This will delete all user data!"
	@docker-compose down -v --rmi all > /dev/null 2>&1
	@echo "✅ Docker cleanup completed (all data deleted)."

# Desarrollo del backend (sin Docker)
backend-dev:
	@echo "🔧 Starting backend in development mode..."
	@cd backend && npm install && npm run dev

# ✅ NUEVA: Ayuda actualizada
help:
	@echo "Available commands:"
	@echo "  make         - Build and start Docker containers"
	@echo "  make build   - Only build Docker images"
	@echo "  make up      - Only start Docker containers"
	@echo "  make stop    - Stop containers (preserve data)"
	@echo "  make clean   - Clean containers/images (preserve data)"
	@echo "  make re      - Full rebuild: clean, build, and start"
	@echo "  make fclean  - Full clean: ⚠️ DELETES ALL DATA ⚠️"
	@echo "  make backend-dev - Start backend in development mode"
