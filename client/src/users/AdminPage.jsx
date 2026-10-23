import { useEffect, useState } from "react";
import api from "../api/api"

const AdminPage = ({userRole}) => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    // 상품 목록과 회원 목록 동시 조회
    useEffect(() => {
        //Promise.all() : 여러개의 비동기 작업을 동시에 처리
        const fetchData = async () => {
            try{
                const [productRes, userRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/users')
                ])
                setProducts(productRes.data);
                setUsers(userRes.data);
            }catch(error){
                console.log("관리자 대시보드 조회 오류: ", error);
            }
        }; //fetchData() 닫기
        fetchData();  //호출
    }, [userRole]); 

    // 전체 상품 개수
    console.log("상품 수: ", products.length);
    
    // 전체 회원수
    console.log("회원 수: ", users.length);

    // 관리자 수(일반회원 제외한 수)
    const adminCount = users.filter(user => user.role === "admin").length;

    // 평균 상품 가격 계산
    // ruduce(): 배열의 합계 계산, 상품 수 [1, 2, 3, 4] sum=0, sum = sum + n
    // sum + product.price, 0 -> sum = 0을 의미
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

    // 평균 가격 = 총 가격 / 상품 수 : 정수로 반올림 Math.round(숫자, 자리수)
    const avgPrice = Math.round(totalPrice / products.length);

    return(
        <div className="admin-page">
            <h2>관리자 대시보드</h2>
            {/* 요약 카드 영역 */}
            <div className="admin-cards">
                <div className="admin-card">
                    <p>전체 상품</p>
                    <strong>{products.length}개</strong>
                </div>
                <div className="admin-card">
                    <p>전체 회원</p>
                    <strong>{users.length}명</strong>
                </div>
                <div className="admin-card">
                    <p>관리자</p>
                    <strong>{adminCount}명</strong>
                </div>
                <div className="admin-card">
                    <p>평균 상품 가격</p>
                    <strong>{avgPrice}원</strong>
                </div>

            </div>


            {/* 최근 등록 상품 */}


            {/* 회원 목록 */}
        </div>
    )
}

export default AdminPage;