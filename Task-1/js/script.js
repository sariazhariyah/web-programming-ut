document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GREETING BERDASARKAN WAKTU
    ===================================================== */

    function getGreeting() {

        const jam = new Date().getHours();

        if (jam < 12) {
            return "Selamat Pagi";
        }

        if (jam < 15) {
            return "Selamat Siang";
        }

        if (jam < 18) {
            return "Selamat Sore";
        }

        return "Selamat Malam";
    }


    const greetingElement =
        document.getElementById("greeting");

    if (greetingElement) {

        greetingElement.textContent =
            getGreeting();

    }



    /* =====================================================
       MENAMPILKAN NAMA USER DI DASHBOARD
    ===================================================== */

    const userGreeting =
        document.getElementById("userGreeting");

    if (userGreeting) {

        const userData =
            localStorage.getItem("loggedInUser");

        if (userData) {

            const user =
                JSON.parse(userData);

            userGreeting.textContent =
                `${getGreeting()}, ${user.nama}. Selamat datang di SITTA Universitas Terbuka.`;

        }

    }



    /* =====================================================
       LOGIN
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                validateLogin();

            }
        );

    }


    function validateLogin() {

        const email =
            document.getElementById("email")
                .value.trim();

        const password =
            document.getElementById("password")
                .value.trim();


        if (email === "" || password === "") {

            showAlert(
                "Email dan password harus diisi.",
                "error"
            );

            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showAlert(
                "Format email tidak valid.",
                "error"
            );

            return;

        }


        const user =
            dataPengguna.find(function (item) {

                return (
                    item.email.toLowerCase() ===
                        email.toLowerCase()
                    &&
                    item.password === password
                );

            });


        if (user) {

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(user)
            );


            showAlert(
                "Login berhasil. Selamat datang, " +
                user.nama + ".",
                "success"
            );


            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 1000);

        }

        else {

            showAlert(
                "Email/password yang anda masukkan salah.",
                "error"
            );

        }

    }



    /* =====================================================
       MODAL
    ===================================================== */

    const modalButtons =
        document.querySelectorAll("[data-modal]");


    modalButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const modalId =
                    button.getAttribute("data-modal");

                const modal =
                    document.getElementById(modalId);

                if (modal) {

                    modal.classList.add("show");

                }

            }
        );

    });


    const modals =
        document.querySelectorAll(".modal");


    modals.forEach(function (modal) {

        const closeButton =
            modal.querySelector(".close");


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    modal.classList.remove("show");

                }
            );

        }


        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    modal.classList.remove("show");

                }

            }
        );

    });



    /* =====================================================
       TRACKING PENGIRIMAN
    ===================================================== */

    const trackingForm =
        document.getElementById("trackingForm");


    if (trackingForm) {

        trackingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                searchTracking();

            }
        );

    }


    function searchTracking() {

        const nomorDO =
            document
                .getElementById("nomorDO")
                .value
                .trim();


        if (nomorDO === "") {

            showAlert(
                "Nomor Delivery Order harus diisi.",
                "error"
            );

            return;

        }


        const tracking =
            dataTracking[nomorDO];


        if (!tracking) {

            document
                .getElementById("trackingResult")
                .classList.remove("show");

            showAlert(
                "Nomor Delivery Order tidak ditemukan.",
                "error"
            );

            return;

        }


        document.getElementById(
            "trackingNama"
        ).textContent =
            tracking.nama;


        document.getElementById(
            "trackingEkspedisi"
        ).textContent =
            tracking.ekspedisi;


        document.getElementById(
            "trackingTanggal"
        ).textContent =
            tracking.tanggalKirim;


        document.getElementById(
            "trackingPaket"
        ).textContent =
            tracking.paket;


        document.getElementById(
            "trackingTotal"
        ).textContent =
            tracking.total;



        /* STATUS */

        const statusElement =
            document.getElementById(
                "trackingStatus"
            );


        statusElement.textContent =
            tracking.status;


        statusElement.className =
            "status-badge";


        const statusClass =
            tracking.status
                .toLowerCase()
                .replace(/\s+/g, "-");


        statusElement.classList.add(
            "status-" + statusClass
        );



        /* PROGRESS */

        let progress = 30;


        if (
            tracking.status ===
            "Dalam Perjalanan"
        ) {

            progress = 60;

        }

        else if (
            tracking.status === "Dikirim"
        ) {

            progress = 80;

        }

        else if (
            tracking.status === "Diterima"
        ) {

            progress = 100;

        }


        const progressFill =
            document.getElementById(
                "progressFill"
            );


        progressFill.style.width =
            progress + "%";


        document.getElementById(
            "progressText"
        ).textContent =
            progress + "%";



        /* RIWAYAT PERJALANAN */

        const riwayatElement =
            document.getElementById(
                "trackingRiwayat"
            );


        riwayatElement.innerHTML = "";


        tracking.perjalanan.forEach(
            function (item) {

                const li =
                    document.createElement("li");


                const waktu =
                    document.createElement("strong");


                waktu.textContent =
                    item.waktu;


                const keterangan =
                    document.createElement("span");


                keterangan.textContent =
                    " - " + item.keterangan;


                li.appendChild(waktu);

                li.appendChild(keterangan);

                riwayatElement.appendChild(li);

            }
        );


        const result =
            document.getElementById(
                "trackingResult"
            );


        result.classList.add("show");


        result.scrollIntoView({
            behavior: "smooth"
        });

    }



    /* =====================================================
       MENAMPILKAN DATA BAHAN AJAR
    ===================================================== */

    const stokTableBody =
        document.getElementById(
            "stokTableBody"
        );


    function loadStokData(data) {

        if (!stokTableBody) {

            return;

        }


        stokTableBody.innerHTML = "";


        data.forEach(function (item) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${item.kodeLokasi}</td>

                <td>${item.kodeBarang}</td>

                <td>${item.namaBarang}</td>

                <td>${item.jenisBarang}</td>

                <td>${item.edisi}</td>

                <td class="${getStokClass(item.stok)}">
                    ${item.stok}
                </td>

                <td>
                    ${
                        item.cover
                        ?
                        `<img
                            src="${item.cover}"
                            alt="Cover ${item.namaBarang}"
                            class="book-cover"
                        >`
                        :
                        `<span class="no-cover">
                            Tidak ada cover
                        </span>`
                    }
                </td>

            `;


            stokTableBody.appendChild(row);

        });

    }



    function getStokClass(stok) {

        if (stok < 100) {

            return "stok-low";

        }


        if (stok < 300) {

            return "stok-medium";

        }


        return "stok-high";

    }



    if (stokTableBody) {

        loadStokData(dataBahanAjar);

    }



    /* =====================================================
       TAMBAH STOK
    ===================================================== */

    const addStokForm =
        document.getElementById(
            "addStokForm"
        );


    if (addStokForm) {

        addStokForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                addStok();

            }
        );

    }



    function addStok() {

        const kodeLokasi =
            document
                .getElementById(
                    "newKodeLokasi"
                )
                .value
                .trim();


        const kodeBarang =
            document
                .getElementById(
                    "newKodeBarang"
                )
                .value
                .trim();


        const namaBarang =
            document
                .getElementById(
                    "newNamaBarang"
                )
                .value
                .trim();


        const jenisBarang =
            document
                .getElementById(
                    "newJenisBarang"
                )
                .value;


        const edisi =
            document
                .getElementById(
                    "newEdisi"
                )
                .value;


        const stokInput =
            document
                .getElementById(
                    "newStok"
                )
                .value;


        const stok =
            Number(stokInput);



        if (
            kodeLokasi === "" ||
            kodeBarang === "" ||
            namaBarang === "" ||
            jenisBarang === "" ||
            edisi === "" ||
            stokInput === ""
        ) {

            showAlert(
                "Semua data harus diisi.",
                "error"
            );

            return;

        }



        if (
            Number.isNaN(stok) ||
            stok < 0
        ) {

            showAlert(
                "Stok harus berupa angka 0 atau lebih.",
                "error"
            );

            return;

        }



        const newData = {

            kodeLokasi:
                kodeLokasi,

            kodeBarang:
                kodeBarang,

            namaBarang:
                namaBarang,

            jenisBarang:
                jenisBarang,

            edisi:
                edisi,

            stok:
                stok,

            cover:
                ""

        };


        dataBahanAjar.push(newData);


        loadStokData(
            dataBahanAjar
        );


        addStokForm.reset();


        showAlert(
            "Data stok berhasil ditambahkan.",
            "success"
        );

    }



    /* =====================================================
       FILTER DATA STOK
    ===================================================== */

    const searchStok =
        document.getElementById(
            "searchStok"
        );


    if (searchStok) {

        searchStok.addEventListener(
            "input",
            function () {

                const keyword =
                    this.value
                        .toLowerCase()
                        .trim();


                const hasilFilter =
                    dataBahanAjar.filter(
                        function (item) {

                            return (

                                item.kodeBarang
                                    .toLowerCase()
                                    .includes(keyword)

                                ||

                                item.namaBarang
                                    .toLowerCase()
                                    .includes(keyword)

                                ||

                                item.kodeLokasi
                                    .toLowerCase()
                                    .includes(keyword)

                            );

                        }
                    );


                loadStokData(
                    hasilFilter
                );

            }
        );

    }



    /* =====================================================
       MENU DEMO
    ===================================================== */

    const demoMenus =
        document.querySelectorAll(
            ".demo-menu, .demo-feature"
        );


    demoMenus.forEach(
        function (menu) {

            menu.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const feature =
                        this.getAttribute(
                            "data-feature"
                        );


                    showAlert(
                        feature +
                        " tersedia sebagai menu pada prototype SITTA.",
                        "info"
                    );

                }
            );

        }
    );



    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutButton =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                localStorage.removeItem(
                    "loggedInUser"
                );


                window.location.href =
                    "index.html";

            }
        );

    }



    /* =====================================================
       CUSTOM ALERT
    ===================================================== */

    function showAlert(
        message,
        type = "info"
    ) {

        const oldAlert =
            document.querySelector(
                ".custom-alert"
            );


        if (oldAlert) {

            oldAlert.remove();

        }


        const alert =
            document.createElement("div");


        alert.className =
            "custom-alert alert-" +
            type;


        alert.textContent =
            message;


        document.body.appendChild(
            alert
        );


        setTimeout(
            function () {

                alert.classList.add(
                    "show"
                );

            },
            50
        );


        setTimeout(
            function () {

                alert.classList.remove(
                    "show"
                );


                setTimeout(
                    function () {

                        alert.remove();

                    },
                    300
                );

            },
            3000
        );

    }

});