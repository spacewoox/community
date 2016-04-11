/*
 * Nanocloud Community, a comprehensive platform to turn any application
 * into a cloud solution.
 *
 * Copyright (C) 2015 Nanocloud Software
 *
 * This file is part of Nanocloud community.
 *
 * Nanocloud community is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * Nanocloud community is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package apps

import (
	"github.com/Nanocloud/community/nanocloud/connectors/db"
	log "github.com/Sirupsen/logrus"
)

func Migrate() error {
	rows, err := db.Query(
		`SELECT table_name
		FROM information_schema.tables
		WHERE table_name = 'apps'`)
	if err != nil {
		log.Error("Select tables names failed: ", err.Error())
		return err
	}
	defer rows.Close()

	if rows.Next() {
		log.Info("apps table already set up")
		return nil
	}
	rows, err = db.Query(
		`CREATE TABLE apps (
			id	SERIAL PRIMARY KEY,
			collection_name		varchar(255),
			alias		varchar(255) UNIQUE,
			display_name		varchar(255),
			file_path		varchar(255),
			icon_content		bytea
		);`)
	if err != nil {
		log.Errorf("Unable to create apps table: %s", err)
		return err
	}

	rows.Close()
	return nil
}
