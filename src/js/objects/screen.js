const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                            <div class="data">
                                <h1>${user.name ?? 'Esse perfil não possui nome cadastrado 😓'}</h1>
                                <p>${user.bio ?? 'Esse perfil não possui bio cadastrada 😓'}</p>
                                <div class="follow">
                                    <div class="followers">
                                        <h3>👥Seguidores:</h3>
                                        <p>${user.followers}</p>
                                    </div>
                                    <div class="following">
                                        <h3>👤Seguindo:</h3>
                                        <p>${user.following}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">
                            <h4>${repo.name}</h4>
                            <div class="repo-info">
                                <p>🍴 ${repo.forks}</p>
                                <p>⭐ ${repo.stargazers_count}</p>
                                <p>👀 ${repo.watchers}</p>
                                <p>👨‍💻 ${repo.language}</p>
                            </div>
                        </a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = '';
        user.events.forEach(evento => {
            if (evento.type === 'PushEvent') {
                eventsItens += `<li>
                                    <h3>${evento.repo.name} </h3>
                                    <p> - ${evento.payload.commits[0].message}</p>
                                </li>`
            } else {
                eventsItens += `<li>
                                    <h3>${evento.repo.name} </h3>
                                    <p> - Criado um ${evento.payload.ref_type}</p>
                                </li>`
            }
        })
        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos:</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado😥</h3>"
    }
}

export { screen }