from datetime import datetime
from pydantic import BaseModel, ConfigDict


class NotificationBase(BaseModel):
    title: str
    message: str
    user_id: int


class NotificationCreate(NotificationBase):
    pass


class NotificationUpdate(BaseModel):
    read: bool | None = None


class NotificationRead(NotificationBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    read: bool
    created_at: datetime