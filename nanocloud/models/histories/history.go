package histories

import (
	"github.com/Nanocloud/community/nanocloud/models/apps"
	"github.com/Nanocloud/community/nanocloud/models/users"
	"github.com/manyminds/api2go/jsonapi"
)

type History struct {
	Id            string `json:"-"`
	UserId        string `json:"user-id"`
	UserMail      string `json:"user-mail"`
	UserFirstname string `json:"user-firstname"`
	UserLastname  string `json:"user-lastname"`
	ConnectionId  string `json:"connection-id"`
	StartDate     string `json:"start-date"`
	EndDate       string `json:"end-date"`

	user *users.User
	app  *apps.App
}

func (h *History) GetID() string {
	return h.Id
}

func (h *History) SetID(id string) error {
	h.Id = id
	return nil
}

func (h *History) GetReferences() []jsonapi.Reference {
	return []jsonapi.Reference{
		{
			Type: "users",
			Name: "user",
		},
		{
			Type: "apps",
			Name: "app",
		},
	}
}

func (h *History) GetReferencedIDs() []jsonapi.ReferenceID {
	result := []jsonapi.ReferenceID{}

	if h.user != nil {
		result = append(
			result,
			jsonapi.ReferenceID{
				ID:   h.user.Id,
				Name: "user",
				Type: "users",
			},
		)
	}

	if h.app != nil {
		result = append(
			result,
			jsonapi.ReferenceID{
				ID:   h.app.GetID(),
				Name: "app",
				Type: "apps",
			},
		)
	}

	return result
}

func (h *History) GetReferencedStructs() []jsonapi.MarshalIdentifier {
	result := []jsonapi.MarshalIdentifier{}

	if h.user != nil {
		result = append(result, h.user)
	}

	if h.app != nil {
		result = append(result, h.app)
	}

	return result
}
