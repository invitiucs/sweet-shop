from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def get_token():
    login = client.post(
        "/api/auth/login",
        json={"username": "testuser1", "password": "test123"}
    )
    return login.json()["access_token"]

def test_add_sweet():
    token = get_token()

    response = client.post(
        "/api/sweets/",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "name": "Test Sweet",
            "category": "Test",
            "price": 10,
            "quantity": 5
        }
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Sweet added"

def test_get_sweets():
    response = client.get("/api/sweets/")
    assert response.status_code == 200
