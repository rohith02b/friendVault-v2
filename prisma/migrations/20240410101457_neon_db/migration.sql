-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "provider" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "members" TEXT[],

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "content_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "content_name" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "content_mimetype" TEXT NOT NULL,
    "uploaded" BOOLEAN NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("content_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "groups_id_key" ON "groups"("id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_code_key" ON "groups"("code");

-- CreateIndex
CREATE UNIQUE INDEX "content_content_id_key" ON "content"("content_id");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
