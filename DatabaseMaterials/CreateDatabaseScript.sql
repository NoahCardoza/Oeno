CREATE TABLE Authors (
    AuthorId        INTEGER     PRIMARY KEY     AUTOINCREMENT,
    AuthorName      VARCHAR(32) NOT NULL
);

CREATE TABLE Batch (
    BatchId             INTEGER     PRIMARY KEY     AUTOINCREMENT,
    AuthorId            INTEGER,
    BatchStartDate      DATE        NOT NULL,
    BatchEndDate        DATE,
    BatchName           VARCHAR(64),
    BatchDescription    TEXT,
    FOREIGN KEY(AuthorId) REFERENCES Authors(AuthorId)
);

CREATE TABLE DayRecord (
    DayRecordId     INTEGER     PRIMARY KEY     AUTOINCREMENT,
    BatchId         INTEGER,
    DayRecordDate   DATE        NOT NULL,       
    FOREIGN KEY(BatchId) REFERENCES Batch(BatchId)
);

CREATE TABLE SubRecord (
    SubRecordId     INTEGER     PRIMARY KEY     AUTOINCREMENT,
    SubRecordNotes  TEXT,
    SubRecordDate   DATETIME    NOT NULL,
    FOREIGN KEY(BatchId) REFERENCES Batch(BatchId)
);

CREATE TABLE SubRecordToEntry (
    SubRecordId     INTEGER     PRIMARY KEY     AUTOINCREMENT,
    EntryId         INTEGER,
    FOREIGN KEY(SubRecordId) REFERENCES SubRecord(SubRecordId),
    FOREIGN KEY(EntryId) REFERENCES Entry(EntryId)
);

CREATE TABLE Entry (
    EntryId     INTEGER     PRIMARY KEY     AUTOINCREMENT,
    TagId       INTEGER,
    Value       TEXT        NOT NULL,
    FOREIGN KEY(TagId) REFERENCES Tag(TagId)
);

CREATE TABLE Tag (
    TagId       INTEGER     PRIMARY KEY     AUTOINCREMENT,
    TagName     VARCHAR(32) NOT NULL,
    Type        TEXT        NOT NULL
);