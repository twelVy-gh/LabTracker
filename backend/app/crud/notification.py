from sqlalchemy.orm import Session
from app.models.notification import Notification
from app.schemas.notification import NotificationCreate, NotificationUpdate


def get_notification(db: Session, notification_id: int) -> Notification | None:
    return db.get(Notification, notification_id)


def get_notifications(db: Session, skip: int = 0, limit: int = 100) -> list[Notification]:
    return db.query(Notification).offset(skip).limit(limit).all()

def get_notifications_by_user(
    db: Session, user_id: int, skip: int = 0, limit: int = 100
) -> list[Notification]:
    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )

def create_notification(db: Session, data: NotificationCreate) -> Notification:
    notification = Notification(
        title=data.title,
        message=data.message,
        user_id=data.user_id,
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification


def update_notification(db: Session, notification_id: int, data: NotificationUpdate) -> Notification | None:
    notification = get_notification(db, notification_id)
    if not notification:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(notification, field, value)
    db.commit()
    db.refresh(notification)
    return notification


def delete_notification(db: Session, notification_id: int) -> bool:
    notification = get_notification(db, notification_id)
    if not notification:
        return False
    db.delete(notification)
    db.commit()
    return True